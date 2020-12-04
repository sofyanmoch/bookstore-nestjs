/* eslint-disable prettier/prettier */
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service'
import { CreatePostDTO } from './dto/create-post.dto'
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes'


@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) { }

    @Get('/posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts()
        return res.status(HttpStatus.OK).json(posts)
    }

    @Get('/posts/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID)
        if(!post) throw new NotFoundException('post does not exist!')
        return res.status(HttpStatus.OK).json(post)
    }

    @Post('/posts/add')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO)
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted succesfully",
            post: newPost
        })
    }

    @Put('/edit/:postID')
    async editPost(
        @Res() res,
        @Param('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO
    ) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO)
        if(!editedPost) throw new NotFoundException('Post does not exist!')
        return res.status(HttpStatus.OK).json({
            message: 'Post has been succesfully updated',
            post: editedPost
        })
    }

    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID)
        if(!deletedPost) throw new NotFoundException('Post does not exist!')
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }
}
