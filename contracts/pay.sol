pragma solidity >=0.4.22 <0.8.0;

contract EtherTransferTo {
    
    function () external payable {
    }

    function balanceOf2() external view returns(uint){
        return address(this).balance;
    }

}

contract Pay {
    string public functionCalled;
    EtherTransferTo private _instance;

    function sendEther() external payable {
        functionCalled = 'sendEther';
    }

    function balanceOf() external view returns(uint){
        return address(this).balance;
    }

    constructor() public {
        // _instance = EtherTransferTo(address(this));
        _instance = new EtherTransferTo();
    }
    
    function sendEther2() external{
        EtherTransferTo a = new EtherTransferTo();
        address payable a_payable = address(uint160(address(a)));
        a_payable.transfer(500);
    }

    address payable addressEtherTransferTo;

    function setAddressEtherTransferTo(address payable _addressEtherTransferTo) external{
        addressEtherTransferTo = _addressEtherTransferTo;
    }
    
}