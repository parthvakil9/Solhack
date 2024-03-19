// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Thhedoor{
    function locked() external returns(bool);
}
interface DAAO{}
interface NNft{
   function ownerOf(uint) external returns(address);
}
interface CCtoken{
    function balanceOf(address) external returns(uint);
}

contract FlagGiver{
    Thhedoor private thedoor;
    DAAO private dao;
    NNft private nft;
    CCtoken private ctoken;
    address private ctfnft;
    bytes32 private Flag_1;
    CCtoken private random0;
    bytes32 private Flag_2;
    address private random1;
    mapping(address=>uint) random2;
    bytes32 private Flag_3;
    constructor(address _cfnt, address _thedoor,address _dao,address _ctoken, address _nft,bytes32 _Flag_1, bytes32 _Flag_2, bytes32 _Flag_3){
        thedoor = Thhedoor(_thedoor);
        Flag_1 = _Flag_1;
        dao = DAAO(_dao);
        Flag_2 = _Flag_2;
        nft = NNft(_nft);
        ctoken = CCtoken(_ctoken);
        Flag_3 = _Flag_3;
        ctfnft = _cfnt;


    }
    function CheckLevel1() public returns(bytes32){
        if(!thedoor.locked()){
            return Flag_1;
        }
        else{
            return bytes32("");
        }
    }
    function CheckLevel2() public view returns(bytes32){
        if (address(dao).balance > 0){
            return bytes32("");
        }
        else{
            return Flag_2;
        }


    }
    function CheckLevel3() public returns(bytes32){
        address adr = nft.ownerOf(1);
        uint balance = ctoken.balanceOf(adr);
        if(adr != ctfnft && balance > 0){
            return Flag_3;
        }
        else{
            return bytes32("");
        }
    }

}