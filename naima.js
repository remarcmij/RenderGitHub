function Request(url, method, cb) {
  method = method || 'GET'
  let req = new XMLHttpRequest()
  req.addEventListener('load', function () {
    cb(JSON.parse(this.responseText))
  })
  req.open(method, url)
  req.send()
}
const members = []
const GitHubORG = 'HackYourFuture'
const HYFReposApiEndpoint = `https://api.github.com/orgs/${GitHubORG}/repos`
const HYFMembersApiEndpoint = `https://api.github.com/orgs/${GitHubORG}/members`

function RenderRepoList(container, list) {
  let $parent = document.querySelector(`${container} ul`)
  $parent.innerHTML = list
}
window.onload = () => {
  Request(HYFReposApiEndpoint, 'GET', (repositoriesList) => {
    let list = repositoriesList
      .reduce((prev, current) => {
        return `${prev}<li><a href="${current.url}">${current.name}</a></li>`
      }, '')
    RenderRepoList('.repo-list', list)
  })
  Request(HYFMembersApiEndpoint, 'GET', (membersList) => {
    membersList.forEach(function (member) {
      let name = member.login
      let url = member.url
      let avatar = member.avatar_url
      members.push(`<li><b>${name}</b>
      <img src="${avatar}" width=25px />
      </li>`)
    })
    RenderRepoList('.member-list', members)
  })
}

