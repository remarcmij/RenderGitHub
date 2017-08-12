(() => {
  const gitHubORG = 'HackYourFuture'
  const hyfReposApiEndpoint = `https://api.github.com/orgs/HackYourFuture/repos`
  const hyfMembersApiEndpoint = `https://api.github.com/orgs/${gitHubORG}/members`

  const $repoList = '.repo-list ul'
  const $memberList = '.member-list ul'

  const request = (url, method) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => resolve(JSON.parse(xhr.responseText)))
      xhr.addEventListener('error', () => reject())
      xhr.open(method, url)
      xhr.send()
    })
  }

  const renderList = $repoList => innerHtml => {
    let $parent = document.querySelector($repoList)
    $parent.innerHTML = innerHtml
  }

  const getHtmlRepoList = repos =>
    repos.reduce((html, { url, name }) =>
      html + `<li><a href="${url}">${name}</a></li>`
      , '')

  const getHtmlMemberList = members =>
    members.reduce((html, { login, avatar_url }) =>
      html + `<li><b>${login}</b><img src="${avatar_url}" width=25px /></li>`
      , '')

  window.onload = () => {
    request(hyfReposApiEndpoint, 'GET')
      .then(getHtmlRepoList)
      .then(renderList($repoList))
      .catch(renderList($repoList)('<li>Error</li>'))

    request(hyfMembersApiEndpoint, 'GET')
      .then(getHtmlMemberList)
      .then(renderList($memberList))
      .catch(renderList($memberList)('<li>Error</li>'))
  }
})()