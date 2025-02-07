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
            const comment = await this.commentRepository.create(post_id, user_id, content);
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

export default CommentController;
