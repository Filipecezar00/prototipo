const player = document.getElementById("player")
const itens = document.querySelectorAll(".item")
const inventario={
    papelao:0,
    garrafa:0,
    tampinha:0
};

function atualizarInventario(){
    document.getElementById('"qtd-papelao').textContent = inventario.papelao;
    document.getElementById("qtd-garrafa").textContent = inventario.garrafa;
    document.getElementById("qtd-tampinha").textContent = inventario.tampinha;
}

function checkCollision(item){
    const itemRect = item.getBoundingClientRect()
    const playerRect = player.getBoundingClientRect()
    return ! (
        playerRect.right < itemRect.left ||
        playerRect.left < itemRect.right ||
        playerRect.bottom < itemRect.top ||
        playerRect.top < itemRect.bottom
    )

}

function coletarItens(){
    items.forEach((item)=>{
        if(item.style.visibility!== "hidden" && checkCollision(item)){
            const tipo = item.getAttribute("data-type")
            inventario[tipo]++
            item.style.visibility = "hidden"
            atualizarInventario()
        }
    })
}

let pos = {x:20,y:450}
const speed = 10

document.addEventListener("keydown",(e)=>{
    switch(e.key){
        case "ArrowLeft":
        case "a":
            pos.x -=speed
            break
          case "ArrowRight":
          case "d":
            pos.x +=speed 
            case "ArrowUp":
            case "w": 
            pos.y -=speed
            break
            case "ArrowDown":
            case "s":
              pos.y +=speed 
              break   
    }

        pos.x = Math.max(0,Math.min(760,pos.x))
        pos.y = Math.max(0,Math.min(460,pos.y))
        player.style.left = pos.x + "px"
        player.style.top = pos.y + "px"
        
        coletarItens()
})

document.getElementById("montar-btn").addEventListener("click",()=>{
    const msg= document.getElementById("mensagem")
    if(inventario.papelao>=2 && inventario.garrafa >=1 && inventario.tampinha>=1){
        inventario.papelao-= 2
        inventario.garrafa -= 1
        inventario.tampinha -=1
        atualizarInventario()
        msg.textContent = `Você criou um Carrinho de Brinquedo!`
        msg.style.color ="green"
    } else {
        msg.textContent = `Itens insuficientes para montar o carrinho!`
        msg.style.color = "red"
    }
})

atualizarInventario()