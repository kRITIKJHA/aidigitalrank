// Fetches case studies from the backend and renders them on the /work/ page.

document.addEventListener('DOMContentLoaded', function () {
  var workList = document.getElementById('work-list');
  if (!workList) return; // Not on the work page

  var API_BASE = 'https://aidigitalrank.onrender.com';

  fetch(API_BASE + '/api/case-studies')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data.success || !data.caseStudies || data.caseStudies.length === 0) {
        workList.innerHTML = '<p style="color: var(--ink-soft);">Case studies coming soon.</p>';
        return;
      }

      workList.innerHTML = ''; // Clear "Loading..."

      data.caseStudies.forEach(function (study) {
        var article = document.createElement('article');
        article.className = 'work-card';

        var industryEl = document.createElement('span');
        industryEl.className = 'work-industry';
        industryEl.textContent = study.industry;

        var titleEl = document.createElement('h2');
        titleEl.textContent = study.title;

        var challengeLabel = document.createElement('h3');
        challengeLabel.textContent = 'The challenge';
        var challengeText = document.createElement('p');
        challengeText.textContent = study.challenge;

        var solutionLabel = document.createElement('h3');
        solutionLabel.textContent = 'What we did';
        var solutionText = document.createElement('p');
        solutionText.textContent = study.solution;

        var resultLabel = document.createElement('h3');
        resultLabel.textContent = 'The result';
        var resultText = document.createElement('p');
        resultText.className = 'work-result';
        resultText.textContent = study.result;

        article.appendChild(industryEl);
        article.appendChild(titleEl);
        article.appendChild(challengeLabel);
        article.appendChild(challengeText);
        article.appendChild(solutionLabel);
        article.appendChild(solutionText);
        article.appendChild(resultLabel);
        article.appendChild(resultText);

        workList.appendChild(article);
      });
    })
    .catch(function () {
      workList.innerHTML = '<p style="color: #B3261E;">Could not load case studies. Please try again later.</p>';
    });
});