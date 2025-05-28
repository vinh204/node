//Button Status
const btnStatus = document.querySelectorAll("[button-status]");
if(btnStatus.length > 0){
    let url = new URL(window.location.href);

    btnStatus.forEach(button =>{
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }else{
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });
    });
}

//End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;

        if(keyword){
            url.searchParams.set("keyword", keyword);
        }else{
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    });
}
// End Form Search

// 
const btnPaginations = document.querySelectorAll("[button-pagination]");
if(btnPaginations){
    let url = new URL(window.location.href);

    btnPaginations.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    });
}

