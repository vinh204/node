
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