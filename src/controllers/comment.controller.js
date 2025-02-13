class CommentController {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Method to create a new comment
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

    // Method to update a comment
    async update(req, res) {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Content is required.' });
        }

        try {
            const comment = await this.commentRepository.update(id, content);
            res.status(200).json(comment);
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).json({ error: 'Error updating comment.' });
        }
    }

    // Method to delete a comment
    async delete(req, res) {
        const { id } = req.params;

        try {
            const comment = await this.commentRepository.delete(id);
            res.status(200).json(comment);
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ error: 'Error deleting comment.' });
        }
    }
}

export default CommentController;
