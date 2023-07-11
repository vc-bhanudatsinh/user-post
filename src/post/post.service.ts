import { Injectable } from '@nestjs/common';
import { Posts } from './post.schema';
import { Model, Types, PipelineStage } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>) {}

  async create(data) {
    const post = await this.postModel.create(data);
    await post.save();
    return post;
  }

  async getPostLists(
    userId: Types.ObjectId,
    limit: number,
    skip: number,
    searchedComment: string | RegExp,
    searchedUserId: Types.ObjectId,
  ) {
    const searchQuery = [
      {
        $unwind: {
          path: '$comments',
          includeArrayIndex: 'string',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { 'comments.comment': searchedComment },
            { title: searchedComment },
            { description: searchedComment },
          ],
        },
      },
      {
        $group: {
          _id: '$_id',
          title: {
            $first: '$title',
          },
          description: {
            $first: '$description',
          },
          postType: {
            $first: '$postType',
          },
          mentions: {
            $first: '$mentions',
          },
          createdAt: {
            $first: '$createdAt',
          },
          shareOnly: {
            $first: '$shareOnly',
          },
          comments: {
            $push: '$comments',
          },
        },
      },
    ];

    const orQuery: object[] = [
      {
        postType: 'public',
      },
    ];

    const pipeline: PipelineStage[] = [
      {
        $match: {
          $or: orQuery,
        },
      },
      {
        $unset: 'comments',
      },
      {
        $group: {
          _id: null,
          results: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $project: {
          totalPost: {
            $size: '$results',
          },
          totalPage: {
            $ceil: {
              $divide: [
                {
                  $size: '$results',
                },
                limit,
              ],
            },
          },
          results: {
            $slice: ['$results', skip, limit],
          },
          _id: 0,
        },
      },
    ];

    if (searchedUserId) {
      orQuery.push({
        postType: 'private',
        $and: [
          {
            $or: [
              {
                userId: userId,
              },
              {
                shareOnly: userId,
              },
            ],
          },
          {
            $or: [
              {
                shareOnly: searchedUserId,
              },
              {
                mentions: searchedUserId,
              },
              {
                'comments.mentions': searchedUserId,
              },
            ],
          },
        ],
      });
      pipeline.splice(1, 0, {
        $addFields: {
          comment: {
            $filter: {
              input: '$comments',
              as: 'comments',
              cond: {
                $in: [searchedUserId, '$$comments.mentions'],
              },
            },
          },
        },
      });
      pipeline.splice(2, 0, {
        $addFields: {
          comment: {
            $cond: [
              {
                $eq: [
                  {
                    $size: '$comment',
                  },
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $eq: [
                      {
                        $size: '$comments',
                      },
                      0,
                    ],
                  },
                  {},
                  {
                    $last: '$comments',
                  },
                ],
              },
              '$comment',
            ],
          },
        },
      });

      if (searchedUserId !== userId) {
        orQuery.push({
          postType: 'private',
          userId: searchedUserId,
          shareOnly: userId,
        });
      } else {
        orQuery.push({
          postType: 'private',
          userId: searchedUserId,
        });
      }
    }

    if (searchedComment) pipeline.splice(1, 0, ...searchQuery);
    return this.postModel.aggregate(pipeline);
  }

  async getPostById(id) {
    return this.postModel.findById(id).lean();
  }

  async getPostDetailsId(
    postId: Types.ObjectId,
    startIndex: number,
    limit: number,
    endIndex: number,
    userId: Types.ObjectId,
  ) {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: postId,
          $or: [
            {
              postType: 'public',
            },
            {
              postType: 'private',
              $or: [{ shareOnly: userId }, { userId: userId }],
            },
          ],
        },
      },
      {
        $addFields: {
          comments: {
            $slice: [{ $reverseArray: '$comments' }, startIndex, endIndex],
          },
          totalComments: {
            $size: '$comments',
          },
          totalPages: {
            $ceil: {
              $divide: [{ $size: '$comments' }, limit],
            },
          },
        },
      },
    ];
    return await this.postModel.aggregate(pipeline);
  }
}
