const profileContainer = document.getElementById('profile');
const repoContainer = document.getElementById('repo-container');

async function fetchRepos() {
    const username = document.getElementById('username').value;
    if (username === '') {
        alert('Please enter a GitHub username');
        return;
    }

    try {
        // Fetch user profile data
        const userProfileResponse = await fetch(`https://api.github.com/users/${username}`);
        const userProfile = await userProfileResponse.json();
        if (userProfile.message === 'Not Found') {
            alert('User not found');
            return;
        }

        displayProfile(userProfile);

        // Fetch user repos
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await repoResponse.json();

        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
    }
}

function displayProfile(userProfile) {
    profileContainer.innerHTML = `
        <div class="user-profile">
            <img src="${userProfile.avatar_url}" alt="User Avatar" width="100" height="100">
            <h2>${userProfile.name ? userProfile.name : userProfile.login}</h2>
            <p>${userProfile.bio ? userProfile.bio : 'No bio available'}</p>
            <p><strong>Followers:</strong> ${userProfile.followers} | <strong>Following:</strong> ${userProfile.following}</p>
            <p><strong>Public Repos:</strong> ${userProfile.public_repos}</p>
        </div>
    `;
}

function displayRepos(repos) {
    repoContainer.innerHTML = repos
        .map(repo => `
            <div class="repo-card">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description ? repo.description : 'No description available'}</p>
                <div class="details">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            </div>
        `)
        .join('');
}
