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
<<<<<<< HEAD
            const post = await this.postRepository.createPost(user_id, content);
=======
            const post = await this.postRepository.create(user_id, content);
>>>>>>> 37a2cdd (fix: controllers, repositories)
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
}

export default PostController;