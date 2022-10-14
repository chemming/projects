

const ethers       = require("ethers");
const expect       = require("chai").expect;
const { execSync } = require('child_process');
const fs           = require('fs');
require('dotenv').config({path: __dirname+"/../../.env"});

describe("UnityCube", function() {

    it("should deploy on decelium", function() {
    
        const deployCommand = "python3 " 
                                + process.env.DECELIUM_PATH + "/commands/deploy.py "  
                                + process.env.DECELIUM_WALLET_FILE + " "
                                + process.env.DECELIUM_WALLET_USER + " " 
                                + process.env.TEST_DEPLOY_URL + " "
                                + "/test/testCryptocurrencyFaucet/test.ipfs "
                                + __dirname + "/../static/ json";
        
        execSync( deployCommand, (err,stdout,stderr) => {   
            
            console.log(stdout);

            expect(stdout).to.be.a('string').that.includes('"self_id"');
            expect(stdout).to.be.a('string').that.includes('obj-');      

            const stdout_obj = JSON.parse(stdout);            
            expect(stdout_obj).to.have.property('self_id');

            console.log(stdout_obj['self_id']);
            const self_id = stdout_obj['self_id'];  
            expect(self_id).to.be.a('string').that.includes('obj-');

            const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

            response = fetch("https://localhost:3000")
                           .then((response) => response.text())
                           .then( function (data) { console.log(data); } );       
            
            /*response = fetch("https://"+process.env.TEST_DEPLOY_URL+"/obj/"+self_id+"/")
                           .then((response) => response.text())
                           .then( function (data) {
                                console.log(data);
                                console.log(typeof data);
                                expect(data).to.be.a('string').that.includes("<p>Enter the amount of DecBUX to mint:</p>");
                                expect(data).to.be.a('string').that.includes("const mintCryptocurrencyPromise = MintContract.mint(BigInt(cryptocurrencyQuantity * 1e18));");*/
                           });           
        });                   
        
    
    
    
    });
    
});