(() => {
  const gitHubORG = 'HackYourFuture'
  const hyfReposApiEndpoint = `https://api.github.com/orgs/HackYourFuture/repos`
  const hyfMembersApiEndpoint = `https://api.github.com/orgs/${gitHubORG}/members`

  const $repoList = '.repo-list ul'
  const $memberList = '.member-list ul'

  const getJSON = url => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => resolve(JSON.parse(xhr.responseText)))
      xhr.addEventListener('error', reject)
      xhr.open('GET', url)
      xhr.send()
    })
  }

  const fetchJSON = url => fetch(url).then(res => res.json())

  const renderList = $repoList => innerHtml => {
    const $parent = document.querySelector($repoList)
    $parent.innerHTML = innerHtml
  }

  const getHtmlRepoList = repos =>
    repos.reduce((html, { url, name }) =>
      html + `<li><a href="${url}">${name}</a></li>`
      , '')

  const getHtmlMemberList = members =>
    members.reduce((html, { login, avatar_url }) =>
      html + `<li><h2>${login}</h2><img src="${avatar_url}" width=230px /></li>`
      , '')

  window.onload = () => {
    getJSON(hyfReposApiEndpoint)
      .then(getHtmlRepoList)
      .then(renderList($repoList))
      .catch(() => renderList($repoList)('<li>Error</li>'))

    fetchJSON(hyfMembersApiEndpoint)
      .then(getHtmlMemberList)
      .then(renderList($memberList))
      .catch(() => renderList($memberList)('<li>Error</li>'))
  }
})()