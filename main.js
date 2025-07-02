const player = document.getElementById("player")
const items = document.querySelectorAll(".item")
const inventario={
    papelao:0,
    garrafa:0,
    tampinha:0
};

function atualizarInventario(){
    document.getElementById("qtd-papelao").textContent = inventario.papelao;
    document.getElementById("qtd-garrafa").textContent = inventario.garrafa;
    document.getElementById("qtd-tampinha").textContent = inventario.tampinha;
}

function checkCollision(item){
    const itemRect = item.getBoundingClientRect()
    const playerRect = player.getBoundingClientRect()
    return ! (
        playerRect.right < itemRect.left ||
        playerRect.left > itemRect.right ||
        playerRect.bottom < itemRect.top ||
        playerRect.top > itemRect.bottom
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
            break 
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

// document.getElementById("montar-btn").addEventListener("click",()=>{
//     const msg= document.getElementById("mensagem")
//     if(inventario.papelao>=2 && inventario.garrafa >=1 && inventario.tampinha>=1){
//         inventario.papelao-= 2
//         inventario.garrafa -= 1
//         inventario.tampinha -=1
//         atualizarInventario()
//         msg.textContent = `Você criou um Carrinho de Brinquedo!`
//         msg.style.color ="green"
//     } else {
//         msg.textContent = `Itens insuficientes para montar o carrinho!`
//         msg.style.color = "red"
//     }
// })

atualizarInventario()

const fases = [
    {
        nome : "Fase 1: Construa um Carrinho de Brinquedo ",
        tipo : "carrinho",
        requisitos:{papelao:2,garrafa:1,tampinha:1},
        mensagem: "Você criou um Carrinho de Brinquedo !"
    },
    {
        nome:"Fase 2 : Construa um Robô",
        tipo : "robo",
        requisitos:{papelao:1,garrafa:3,tampinha:2},
        mensagem:"Você criou um Robô Reciclável !"
    },
    {
        nome:"Fase 3 : Construa um Avião",
        tipo:"aviao",
        requisitos:{papelao:1,garrafa:2,tampinha:1},
        mensagem:"Você criou um avião de brinquedo."
    }
]

let faseAtual = 0 

function atualizarMissao(){
    const fase = fases[faseAtual];
    document.getElementById("fase-texto").textContent= fase? fase.nome: "Parabéns! Você concluiu todas as fases"

}
function temRequisitos(requisitos){
    return Object.entries(requisitos).every(([item,qtd])=>inventario[item]>=qtd)
}
function consumirRequisitos(requisitos){
    for(const item in requisitos){
        inventario[item]-=requisitos[item]
    }
    atualizarInventario()
}

document.querySelectorAll(".montar").forEach((botao)=>{
    botao.addEventListener("click",()=>{
        const tipo = botao.getAttribute("data-tipo")
        const msg = document.getElementById("mensagem")

        const fase = fases[faseAtual]
        if(!fase|| fase.tipo!==tipo){
            msg.textContent = `Este brinquedo não faz parte da missão atual.`
            msg.style.color = "orange"
            return
        }
        if(temRequisitos(fase.requisitos)){
            consumirRequisitos(fase.requisitos)
            msg.textContent = fase.mensagem
            msg.style.color = "green"
            faseAtual++
            atualizarMissao()
        }else{
            msg.textContent = `Itens insuficientes para montar!`
            msg.style.color = "red" 
        }
    })
})

atualizarInventario()
atualizarMissao()