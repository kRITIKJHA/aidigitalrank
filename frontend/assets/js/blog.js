// Fetches blog posts from the backend and renders them into the page.
// If the backend isn't running, the hardcoded fallback cards already in
// the HTML stay visible instead — so the page never looks broken.

document.addEventListener('DOMContentLoaded', function () {
  var blogGrid = document.querySelector('.blog-grid');
  if (!blogGrid) return; // Not on the blog page — do nothing

  fetch('http://localhost:3000/api/posts')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data.success || !data.posts || data.posts.length === 0) {
        return; // Keep the fallback HTML if there's nothing to show
      }

      // Clear out the hardcoded placeholder cards before adding real ones.
      blogGrid.innerHTML = '';

      data.posts.forEach(function (post) {
        var article = document.createElement('article');
        article.className = 'blog-card';

        var date = new Date(post.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        // Using textContent (not innerHTML) for anything that came from
        // the database is important — it prevents malicious HTML/scripts
        // hidden in the data from ever being executed in the browser.
        var dateEl = document.createElement('span');
        dateEl.className = 'blog-date';
        dateEl.textContent = date;

        var titleEl = document.createElement('h2');
        titleEl.textContent = post.title;

        var excerptEl = document.createElement('p');
        excerptEl.textContent = post.excerpt;

        article.appendChild(dateEl);
        article.appendChild(titleEl);
        article.appendChild(excerptEl);
        blogGrid.appendChild(article);
      });
    })
    .catch(function () {
      // Backend not running, or network issue — silently keep the
      // fallback cards that are already in the HTML.
      console.log('Could not load posts from backend, showing fallback content.');
    });
});