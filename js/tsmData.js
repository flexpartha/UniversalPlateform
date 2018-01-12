var tsmData=angular.module('TsmMobile',[]);

tsmData.controller('loginCtrl',function($scope,$http){

	$scope.Username1="Username";
	$scope.Password1="Password";

	$scope.IsVisible=false;
	$scope.IsVisible2=true;
	$scope.IsVisible3=false;
	$scope.login=function(){	

		var config = {
                headers: { 'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpQYXNzd29yZDE=', 'Content-Type': 'application/json' }
      }
	
	$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.configuration'
	, {"Action": "GetConfigurationData","ConfigurationFilter": {"username": username.value,"Password":password.value}}
	, config).success(function(response){		
		console.log(response);
		    
		    if(response.ConfigurationData){
		    	var jsonobj = angular.fromJson(response.ConfigurationData);		    
		    	var comp 	= parseFloat(jsonobj[0].CompanyID);
		    	if(isNaN(comp)){comp=0;}else{comp=comp;}

		    	$scope.IsVisible=true;
				$scope.IsVisible2=false;
				
				
			
			$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.configuration'
			, {"Action": "GetConfigurationData","ConfigurationFilter": {"CompanyID": comp}}
			, config).success(function(response){
			var dropdownlist 				= angular.fromJson(response.ConfigurationData);			
			$scope.configurationdatas       = dropdownlist;
		});
			
			//alert(comp);
		    }
		    else
			{
			  alert("Invalid username OR Password!");
			  /*$scope.IsVisible3=true;
			  $scope.errorMsg="Invalid username OR Password!";*/
			  
			}

		   });
	}
});


tsmData.controller('TsmDataCtrl',function($scope,$http,$log){
	//$scope.thapa = 'parths';

	var config = {
                headers: { 'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpQYXNzd29yZDE=', 'Content-Type': 'application/json' }
            }
	

/*$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.configuration'
	, {"Action": "GetConfigurationData","ConfigurationFilter": {"username": username.value,"Password":password.value}}
	, config).success(function(response){
		    var jsonobj = angular.fromJson(response.ConfigurationData);
		    var comp 	= jsonobj[0].CompanyID;
		    //$scope.configurationdatas       = jsonobj;
		    console.log(jsonobj);
			//$log.info(response);
			//$log.info(jsonobj.length)
			
	$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.configuration'
		, {"Action": "GetConfigurationData","ConfigurationFilter": {"CompanyID": comp}}
		, config).success(function(response){
			var dropdownlist 				= angular.fromJson(response.ConfigurationData);			
			$scope.configurationdatas       = dropdownlist;
	});
			
			//alert(comp);
			
});*/

$scope.SelectedItem="Select From List";
$scope.SelectedItem2="Select From List";
$scope.dropboxitemselected=function (item){
	$scope.SelectedItem=item;
	//alert(item);
	console.log(item);
}

	$scope.dropboxitemselected2=function (item){
		$scope.SelectedItem2=item;
		//alert(item);
	}

	$scope.show = 1;
	$scope.message=0;
	$scope.message2=0;
	$scope.message3=0;
	$scope.message4=0;
	$scope.message5=0;

	           var transObj={"Action": "GET","CompanyEntity": {"CompanyEntityID":2,"TsmWinApiDriverBaseUrl":"","EntityOptions":"{\"ApiEndpointUrl\": \"https://api.xero.com\",\"ConsumerKey\": \"GJIOCJ707YKTCSVFFRKO1VDEOFXQA0\",\"ConsumerSecret\": \"1ZWHU0C98H6FXXZB8R1ETWQM7JWFU7\",\"PrivateKeyFile\": \"D:\\\\TsmAccountingLink\\\\Infrastructure\\\\Certificates\\\\XeroKeys\\\\public_privatekey.pfx\"}","CompanyID":1,"EntityID":2,"Entity":{"EntityID":2,"Name":"Xero","Description":"Online Accounting Software for Small Business","PipelineGuid":"28921607-4820-452b-953e-8f5fc43ab713","IsUsingTsmWinApiDriver":false,"DefaultOptions":"{}"}}}

	           //TSM Data Accounts

	           var tsmtransObj={"Action": "GET","CompanyEntity": {"CompanyEntityID":1,"TsmWinApiDriverBaseUrl":"http://api.tsmwinapidriver-self.com:8085","EntityOptions":"{}","CompanyID":1,"EntityID":1,"Entity":{"EntityID":1,"Name":"Tsm","Description":"Australia's #1 Field Service Management Software","PipelineGuid":"","IsUsingTsmWinApiDriver":true,"DefaultOptions":"{}"}}}

	           var transInvoice={"Action": "GET","CompanyEntity": {"CompanyEntityID":1,"TsmWinApiDriverBaseUrl":"http://api.tsmwinapidriver-self.com:8085","EntityOptions":"{}","CompanyID":1,"EntityID":1,"Entity":{"EntityID":1,"Name":"Tsm","Description":"Australia's #1 Field Service Management Software","PipelineGuid":"","IsUsingTsmWinApiDriver":true,"DefaultOptions":"{}"}}}


	$scope.loadTransaction=function(){
		//alert($scope.SelectedItem);

		//alert("HI PARTHA");

		/*if($scope.SelectedItem=="Tsm"){
			alert("HI PARTHA");
		}

		else if($scope.SelectedItem=="Xero"){
			alert("HI Lalit");
		}
		else if($scope.SelectedItem=="ReckonOne"){
			alert("HI Sandy");
		}
		else
		{
			alert("Please Select From Dropdown");
		}*/
			var config = {
                headers: { 'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpQYXNzd29yZDE=', 'Content-Type': 'application/json' }
            }

            if($scope.SelectedItem=="Xero"){

			$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.accounts',
			transObj,config).success(function(response){
				console.log(response);
		    var jsonTrobj = angular.fromJson(response.TransactionData);
		    //var comp = jsonobj[2].Com;
		    $log.info(response);
			$scope.transactiondatas=jsonTrobj;
			$log.info(jsonTrobj);
			$scope.message=jsonTrobj.length;
			$scope.message3=jsonTrobj.length;	
			$scope.Details=function(NAME){
				for(i in $scope.transactiondatas){
					if($scope.transactiondatas[i].Name==NAME){
						$scope.newDetail={
							NewName:$scope.transactiondatas[i].Name,
							NewAccountType:$scope.transactiondatas[i].AccountType,
							NewAccountCode:$scope.transactiondatas[i].AccountCode
						}

					}
					$scope.selectedTransaction=NAME;
					
				}
				
				
				
			}

			$scope.isSelTransaction=function(NAME){
                    return $scope.selectedTransaction===NAME;
                }
                // response closed
		}).error(function(response,status){
			$scope.response.error = { message: error, status: status};
        console.log($scope.response.error.status); 
		});
	}	
		
	else if($scope.SelectedItem=="Tsm"){
		/*alert("No Data Available");
		$scope.message=0;
		$scope.transactiondatas=null;
		$scope.message3=0;*/

		$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.accounts',
			tsmtransObj,config).success(function(response){
				console.log(response);
		    var jsonTrobj = angular.fromJson(response.TransactionData);
		    //var comp = jsonobj[2].Com;
		    $log.info(response);
			$scope.transactiondatas=jsonTrobj;
			$log.info(jsonTrobj);
			$scope.message=jsonTrobj.length;
			$scope.message3=jsonTrobj.length;	
			$scope.Details=function(NAME){
				for(i in $scope.transactiondatas){
					if($scope.transactiondatas[i].Name==NAME){
						$scope.newDetail={
							NewName:$scope.transactiondatas[i].Name,
							NewAccountType:$scope.transactiondatas[i].AccountType,
							NewAccountCode:$scope.transactiondatas[i].AccountCode
						}

					}
					$scope.selectedTransaction=NAME;
					
				}
				
				
				
			}

			$scope.isSelTransaction=function(NAME){
                    return $scope.selectedTransaction===NAME;
                }
                // response closed
		}).error(function(response,status){
			$scope.response.error = { message: error, status: status};
        console.log($scope.response.error.status); 
		});
		
	 }	

	 else if($scope.SelectedItem=="ReckonOne"){
		alert("No Data Available");
		$scope.message=0;
		$scope.transactiondatas=null;
		$scope.message3=0;
		
	 }
	 else
	 {
	 	alert("Please Select Item From Dropdown ");
	 }			
}
	$scope.loadtaxCodes=function(){

		var config = {
                headers: { 'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpQYXNzd29yZDE=', 'Content-Type': 'application/json' }
          }

       if($scope.SelectedItem=="Xero"){
		 $http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.taxrates',
          transObj,config).success(function(response){
			//$scope.countryData=data.countryData;
			var jsonTaxobj = angular.fromJson(response.TransactionData);
			$scope.transactiontaxDatas=jsonTaxobj;
			$scope.message2=jsonTaxobj.length;
			$scope.message3=jsonTaxobj.length;
			$log.info(response);
			$scope.TaxDetails=function(NAME){
				//alert("HI THERE");
				for(i in $scope.transactiontaxDatas){
					if($scope.transactiontaxDatas[i].Name==NAME){
						$scope.newTaxDetail={
							NewTaxName:$scope.transactiontaxDatas[i].Name,
							NewTaxType:$scope.transactiontaxDatas[i].TaxType,
							NewTaxRate:$scope.transactiontaxDatas[i].Rate
						}

					}
					$scope.selectedTransactionTax=NAME;
					
				}
				
				
				
			}

			$scope.isSelTransactionTax=function(NAME){
                    return $scope.selectedTransactionTax===NAME;
                }
		});
       }

     else if($scope.SelectedItem=="Tsm"){
		/*alert("No Data Available");
		$scope.message2=0;
		$scope.transactiontaxDatas=null;
		$scope.message3=0;*/

		$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.taxrates',
          tsmtransObj,config).success(function(response){
			//$scope.countryData=data.countryData;
			var jsonTaxobj = angular.fromJson(response.TransactionData);
			$scope.transactiontaxDatas=jsonTaxobj;
			$scope.message2=jsonTaxobj.length;
			$scope.message3=jsonTaxobj.length;
			$log.info(response);
			$scope.TaxDetails=function(NAME){
				//alert("HI THERE");
				for(i in $scope.transactiontaxDatas){
					if($scope.transactiontaxDatas[i].Name==NAME){
						$scope.newTaxDetail={
							NewTaxName:$scope.transactiontaxDatas[i].Name,
							NewTaxType:$scope.transactiontaxDatas[i].TaxType,
							NewTaxRate:$scope.transactiontaxDatas[i].Rate
						}

					}
					$scope.selectedTransactionTax=NAME;
					
				}
				
				
				
			}

			$scope.isSelTransactionTax=function(NAME){
                    return $scope.selectedTransactionTax===NAME;
                }
		});

		
	 }	

	 else if($scope.SelectedItem=="ReckonOne"){
		alert("No Data Available");
		$scope.message2=0;
		$scope.transactiontaxDatas=null;
		$scope.message3=0;
		
	 }
	 else
	 {
	 	alert("Please Select Item From Dropdown ");
	 }			
		
	}

	$scope.loadcontacts=function(){
		var config = {
                headers: { 'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpQYXNzd29yZDE=', 'Content-Type': 'application/json' }
          }

          if($scope.SelectedItem=="Xero"){
			$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.contacts',
          	transObj,config).success(function(response){
			//$scope.countryData=data.countryData;
			var jsonconTactobj = angular.fromJson(response.TransactionData);
			$scope.transactioncontactDatas=jsonconTactobj;
			$scope.message4=jsonconTactobj.length;
			$scope.message3=jsonconTactobj.length;
			$log.info(response);
			$scope.ContactDetails=function(CONTACTID){
				//alert("HI THERE");
				for(i in $scope.transactioncontactDatas){
					if($scope.transactioncontactDatas[i].ContactID==CONTACTID){
						$scope.newContactDetail={
							NewContactid:$scope.transactioncontactDatas[i].ContactID,
							NewContactType:$scope.transactioncontactDatas[i].ContactType,
							NewCompanyname:$scope.transactioncontactDatas[i].CompanyName,
							FIRSTNAME:$scope.transactioncontactDatas[i].FirstName,
							LASTNAME:$scope.transactioncontactDatas[i].LastName,
							EMAIL:$scope.transactioncontactDatas[i].Email,
							WEBSITE:$scope.transactioncontactDatas[i].Website,
							ABN:$scope.transactioncontactDatas[i].Abn
						}

					}
					$scope.selectedTransactionContact=CONTACTID;
					
				}
				
				
				
			}

			$scope.isSelTransactionContact=function(CONTACTID){
                    return $scope.selectedTransactionContact===CONTACTID;
                }
		});

	  }

	  else if($scope.SelectedItem=="Tsm"){
		/*alert("No Data Available");
		$scope.message4=0;
		$scope.transactioncontactDatas=null;
		$scope.message3=0;*/

		$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.contacts',
          	tsmtransObj,config).success(function(response){
			//$scope.countryData=data.countryData;
			var jsonconTactobj = angular.fromJson(response.TransactionData);
			$scope.transactioncontactDatas=jsonconTactobj;
			$scope.message4=jsonconTactobj.length;
			$scope.message3=jsonconTactobj.length;
			$log.info(response);
			$scope.ContactDetails=function(CONTACTID){
				//alert("HI THERE");
				for(i in $scope.transactioncontactDatas){
					if($scope.transactioncontactDatas[i].ContactID==CONTACTID){
						$scope.newContactDetail={
							NewContactid:$scope.transactioncontactDatas[i].ContactID,
							NewContactType:$scope.transactioncontactDatas[i].ContactType,
							NewCompanyname:$scope.transactioncontactDatas[i].CompanyName,
							FIRSTNAME:$scope.transactioncontactDatas[i].FirstName,
							LASTNAME:$scope.transactioncontactDatas[i].LastName,
							EMAIL:$scope.transactioncontactDatas[i].Email,
							WEBSITE:$scope.transactioncontactDatas[i].Website,
							ABN:$scope.transactioncontactDatas[i].Abn
						}

					}
					$scope.selectedTransactionContact=CONTACTID;
					
				}
				
				
				
			}

			$scope.isSelTransactionContact=function(CONTACTID){
                    return $scope.selectedTransactionContact===CONTACTID;
                }
		});
		
	 }	

	 else if($scope.SelectedItem=="ReckonOne"){
		alert("No Data Available");
		$scope.message4=0;
		$scope.transactioncontactDatas=null;
		$scope.message3=0;
		
	 }
	 else
	 {
	 	alert("Please Select Item From Dropdown ");
	 }			
		
	}

	$scope.loadInvoiceData=function(){
		var config = {
                headers: { 'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpQYXNzd29yZDE=', 'Content-Type': 'application/json' }
            }

            if($scope.SelectedItem=="Xero"){
            	$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.invoices',
				transInvoice,config).success(function(response){
            		console.log(response);
            		var tranInvoice=angular.fromJson(response.TransactionData);
            		$scope.tranInvoiceDatas=tranInvoice;
            		$scope.message5=tranInvoice.length;
            		$scope.message3=tranInvoice.length;
            		$scope.invoiceDetails=function(COMMENT){
				for(i in $scope.tranInvoiceDatas){
					if($scope.tranInvoiceDatas[i].Comment==COMMENT){
						$scope.newInvoiceDetail={
							NewComment:$scope.tranInvoiceDatas[i].Comment,
							NewInvoiceDate:$scope.tranInvoiceDatas[i].InvoiceDate,
							NewInvoiceNumber:$scope.tranInvoiceDatas[i].InvoiceNumber,
							NewInvoiceContact:$scope.tranInvoiceDatas[i].Contact.CompanyName,
							
						}

						/*for(j in $scope.tranInvoiceDatas[i].LineItems){
								//alert($scope.tranInvoiceDatas[i].LineItems[j].Total);
								$scope.newInvoiceDetail={
									NewInvoiceLineItems:$scope.tranInvoiceDatas[i].LineItems[j].Total
								}
							}*/

					}
					$scope.selectedTransaction=COMMENT;
					
				}
				$scope.isSelTransaction=function(COMMENT){
                    return $scope.selectedTransaction===COMMENT;
                }
				
				
			}
          }).error(function(response,status){
			$scope.response.error = { message: error, status: status};
        console.log($scope.response.error.status); 
		});
       }
	}	
});


tsmData.controller('CgcompanyCtrl',function($scope,$http,$log){

	var jsonParse;

	$scope.IsVisible=false;

	var config = {
                headers: { 'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpQYXNzd29yZDE=', 'Content-Type': 'application/json' }
            }
	

/*$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.configuration'
	, {"Action": "GetConfigurationData","ConfigurationFilter": {"username": "user31@email.com","Password":"Pass31"}}
	, config).success(function(response){
		    var jsonobj = angular.fromJson(response.ConfigurationData);
		    var comp 	= jsonobj[0].CompanyID;
		    //$scope.configurationdatas       = jsonobj;
		    console.log(jsonobj);
			$log.info(response);
			$log.info(jsonobj.length)
			
	$http.post('http://www.tsmaccountinglinkui.com:5858/api/tsmaccountinglink.configuration'
		, {"Action": "GetConfigurationData","ConfigurationFilter": {"CompanyID": comp}}
		, config).success(function(response){
			var dropdownlist 				= angular.fromJson(response.ConfigurationData);			
			$scope.configurationdatas       = dropdownlist;
	});
			
			
			
});*/
			
	$scope.showEdit=function () {
			//$scope.IsVisible=$scope.IsVisible ? false : true;
			$scope.IsVisible=true;
		}

		$scope.showEntity=function () {
			//$scope.IsVisible=$scope.IsVisible ? false : true;
			$scope.IsVisible2=true;
		}

	$scope.editUser=function(uId){


		for (i in $scope.configurationdatas) {
			//if($scope.configurationdatas[i].CompanyID==uId){
				//var list= $scope.configurationdatas[i].Users.length
				for (j in $scope.configurationdatas[i].Users) {
					if($scope.configurationdatas[i].Users[j].UserID==uId)
					$scope.newuser={
						UserId:$scope.configurationdatas[i].Users[j].UserID,
						UserName:$scope.configurationdatas[i].Users[j].Username,
						PassWord:$scope.configurationdatas[i].Users[j].Password
					}
				};
				
				//$window.alert(list);
			//}
		};
	};

	$scope.editEntyties=function(eId){
		for (k in $scope.configurationdatas) {
			for(l in $scope.configurationdatas[k].CompanyEntities){
				$.each($scope.configurationdatas[k].CompanyEntities[l].Entity,function(i,item){
						if($scope.configurationdatas[k].CompanyEntities[l].Entity.EntityID==eId){
						$scope.newEntity={
							EntityId:$scope.configurationdatas[k].CompanyEntities[l].Entity.EntityID,
							NAME:$scope.configurationdatas[k].CompanyEntities[l].Entity.Name,
							DESCRIPTION:$scope.configurationdatas[k].CompanyEntities[l].Entity.Description,
							ENTITYOPTION:angular.fromJson($scope.configurationdatas[k].CompanyEntities[l].EntityOptions)
						}
					}

				});
			};
		};
	}
	});
	




