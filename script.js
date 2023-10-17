const nodeMaker = function()
{
    const data = null;
    const connections = []
    const visited = false
    const range = 0
    const predecesor = null

    return{data,connections,visited,range,predecesor}

}
function find(array,itemToFind)
    {
        //possibly make this into an recursive search for the item,binary search with sorted array to be specific for efficiency
        for(let i = 0;i<array.length - 1;)
        {
            
            if(array[i].data[0] == itemToFind[0])
            {
                for(let n = 0; n<8;n++)
                {
                    if(array[i + n].data[1] == itemToFind[1])
                    {
                        return array[i+n]
                    }
                }
            }
            i+= 8

            
        }
        return null
    }
const treeMaker = function()
{
    const gameBoard = board(8);
    

    for(let i = 0;i<gameBoard.length;i++)
    {
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] +2 ,gameBoard[i].data[1] +1]))
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] -2 ,gameBoard[i].data[1] +1]))
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] +2 ,gameBoard[i].data[1] -1]))
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] -2 ,gameBoard[i].data[1] -1]))
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] +1 ,gameBoard[i].data[1] -2]))
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] +1 ,gameBoard[i].data[1] +2]))
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] -1 ,gameBoard[i].data[1] +2]))
        gameBoard[i].connections.push(find(gameBoard,[gameBoard[i].data[0] -1 ,gameBoard[i].data[1] -2]))
    }

    return gameBoard


}

const board = function(size)
{
    const spots = []
    for(let i = 0;i<size;i++)
    {
        for(let n = 0;n<size;n++)
        {
            let node = nodeMaker()
            node.data = [i,n]
            spots.push(node)
        }
    }
    return spots
}
const knightMoves = function(spot,target)
{
    const chessBoard = treeMaker()
    let source = find(chessBoard,spot)

    let point = source;
    let queue = [point]
    let steps = 0;
    let showCaseArray = []
    while(queue[0] != null)
    {
        
        if(queue[0].visited === false)
        {
            queue[0].range = steps

            if(queue[0].data[0] === target[0] && queue[0].data[1] === target[1])
            {
                showCaseArray.push(queue[0].data)
                for(let n = 0;n<steps;n++)
                {
                    point.predecesor = null
                    if(queue[0].predecesor != null)
                    {
                        showCaseArray.push(queue[0].predecesor.data)
                        let temp = queue[0].predecesor
                        queue = []
                        queue.push(temp)
                    }
                }
                return showCaseArray
            }

            for(let i = 0;i<queue[0].connections.length;i++)
            {
                if(queue[0].connections[i] != null)
                {
                    if( queue[0].connections[i].predecesor == null)
                    {
                        queue[0].connections[i].predecesor = queue[0]
                    }
                    if(queue[0].connections[i].predecesor.visited === false)
                    {
                        queue.push(queue[0].connections[i])
                    }
                }
                
            }
            queue[0].visited = true
            steps += 1;
            
        }
        queue.shift()
        
        
    }
}
console.log(knightMoves([6,6],[0,0]))