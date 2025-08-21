export default function renderToUl(users, appendTo) {
  if (!users) return;
  users?.map(({ name, avatar_url, login }) => {
    const searchSuggLists = document.createElement("li");
    searchSuggLists.innerHTML = `<div class=" flex items-center space-x-2 "><div class="w-8 h-8 rounded-full overflow-hidden"><img src="${avatar_url}"></img></div> <div class="font-extrabold text-[13px] "><p>${name}</p><p class="text-[10px] text-[#a1a1a1] user-name">@${login}</p></div></div>`;
    return appendTo.append(searchSuggLists);
  });
}
