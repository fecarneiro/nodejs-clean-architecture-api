<<<<<<< HEAD

=======
>>>>>>> 37a2cdd (fix: controllers, repositories)
class CommentController {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    async create(req, res) {
        const { post_id, content } = req.body;
        const user_id = req.user.id;

        if (!post_id || !content) {
            return res.status(400).json({ error: 'Post ID and comment content are required.' });
        }

        try {
<<<<<<< HEAD
            const comment = await this.commentRepository.createComment(post_id, user_id, content);
=======
            const comment = await this.commentRepository.create(post_id, user_id, content);
>>>>>>> 37a2cdd (fix: controllers, repositories)
            res.status(201).json(comment);
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Error creating comment.' });
        }
    }

    // Method to list all comments
    async findAll(req, res) {
        try {
            const comments = await this.commentRepository.findAll();
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error listing comments:', error);
            res.status(500).json({ error: 'Error listing comments.' });
        }
    };
}

<<<<<<< HEAD
export default CommentController;

=======
export default CommentController;
>>>>>>> 37a2cdd (fix: controllers, repositories)
