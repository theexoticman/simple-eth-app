pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager; // manager address
    address[] public players; // address of participants
    string public test;

    constructor()  {
        manager = msg.sender; // the smart contract deployer is the manager
        test='TEST';
    }
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender); // the player entering the lottery has to pay
    }
    function random() public view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
        
    }
    function pickWinner() public restricted {
        uint index  = random() % players.length;
        address payable user =  payable(players[index]);
        user.transfer(address(this).balance);
        players= new address[](0); // no address in the list.
    }
    function getPlayers() public view returns( address[] memory){
        return players;
    }
    modifier restricted(){
        require(msg.sender == manager);
        _; // the code of the method with the modifier is executed here
    }


}
