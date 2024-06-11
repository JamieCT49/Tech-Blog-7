const newBlog = async (event) => {
    event.preventDefault();
    const blog_title = document.querySelector('#blog_title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    if (blog_title && description) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({blog_title, description}),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    } 
};

const deleteButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });
        if(response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.new-blog-form')
.addEventListener('submit', newBlog);

document
.querySelector('.blog-list')
.addEventListener('click', deleteButton);