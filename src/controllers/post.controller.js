class PostController {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    
    // Method to create new post
    async create(req, res) {
        const { content } = req.body;
        const user_id = req.user.id;

        if (!content) {
            return res.status(400).json({ error: 'Content is required.' });
        }

        try {
            const post = await this.postRepository.create(user_id, content);
            return res.status(201).json(post);
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ error: 'Error creating post.' });
        }
    }

    // Method to list all posts
    async findAll(req, res) {
        try {
            const posts = await this.postRepository.findAll();
            return res.status(200).json(posts);
        } catch (error) {
            console.error('Error listing posts:', error);
            return res.status(500).json({ error: 'Error listing posts.' });
        }
    }

    // Method to update post
    async update(req, res) {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Content is required.' });
        }

        try {
            const post = await this.postRepository.update(id, content);
            return res.status(200).json(post);
        } catch (error) {
            console.error('Error updating post:', error);
            return res.status(500).json({ error: 'Error updating post.' });
        }
    }

    // Method to delete post
    async delete(req, res) {
        const { id } = req.params;

        try {
            const post = await this.postRepository.delete(id);
            return res.status(200).json(post);
        } catch (error) {
            console.error('Error deleting post:', error);
            return res.status(500).json({ error: 'Error deleting post.' });
        }
    }
}

export default PostController;