angular
.module('lybApp')
.controller('storeCtrl', ['$scope', function($scope, $timeout, $window, $location, Notification) {
    
         $scope.itemEntry = [{
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011608172_img_4169.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "£59.99",
                                        itemImage: [
                                             {image: 'http://www.youmustcreate.com/site/wp-content/uploads/2013/06/alim_side-310x390.jpg'},
                                             {image: 'http://www.youmustcreate.com/site/wp-content/uploads/2013/06/slim007-pale-tortoise-sun-950x1216.jpg'},
                                              {image: 'http://www.youmustcreate.com/site/wp-content/uploads/2013/06/slim_yellow_sun-310x390.jpg?b1f7f4'}
                                        ],
                                        relatedItems: [ 
                                            {items: 'http://www.youmustcreate.com/site/wp-content/uploads/2013/06/rocco_front_15-950x1216.jpg'},
                                            {items: 'http://www.youmustcreate.com/site/wp-content/uploads/2013/06/bonafidegreen-950x1216.jpg'},
                                            {items: 'http://www.youmustcreate.com/site/wp-content/uploads/2013/06/bonafidegreen-950x1216.jpg'}
                                        ],

                                },


                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011513865_img_0728.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },


                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011501343_img_6051.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011513865_img_0728.jpg",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011521679_img_9173.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },


                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/w/h/white_1.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011488743_img_4474.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011482222_img_3576-copie.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },


                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011372653_img_5256.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011489818_img_4632.jpg",
                                    productTitle: "Acid Print Sweat",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/0/0/0000011465126_img_0197.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://cdn.colette.fr/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/h/a/haas1.jpg",
                                    productTitle: "Tuck Stitch",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },

                                {
                                    image: "http://www.youmustcreate.com/site/wp-content/uploads/2013/06/slim007-pale-tortoise-sun-950x1216.jpg",
                                    productTitle: "Mc Ginn Slim",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                },
               

                                {
                                    image: "http://www.colette.fr/media/push/swa_mmm_001255.jpg",
                                    productTitle: "Ipath lowrunner",
                                    productDesc: "Low skateshoes - Grey",
                                    user: "Nate knows",
                                    price: "$17"
                                }
                            ];

        $scope.midRaise = true;

        $scope.mainNavMenu = function (){
            $scope.navBgWrapper = !$scope.navBgWrapper;
            $scope.itemsVisble = false;
            $scope.highRaise = false;
        }
        
        $scope.followeringMenu = function (){
            $scope.panelWigetWrapper = !$scope.panelWigetWrapper;
        }

        $scope.itemMenu = function() {
            $scope.itemsVisble = !$scope.itemsVisble;
            $scope.highRaise = false;
            $scope.navBgWrapper = false;

        }
        
        $scope.likeItems = function() {
            $scope.highRaise = !$scope.highRaise;
            $scope.itemsVisble = false;
            $scope.navBgWrapper = false;
        }
         
        $scope.panel = { open: false, content: null, model: {} };
         
        $scope.openProduct = function openProduct(model) {

            $scope.siteBlackout = !$scope.siteBlackout;
            if (!model || !('productTitle' in model) || !model.productTitle) {

                // Ensure we have a valid being model passed along.
                throw "Please provide a model to the `openProduct` method."

            }

            // Open the panel with the partial for the related product.
            $scope.panel.open    = true;
            $scope.panel.model   = model;
            $scope.panel.partial = 'store-view.html';
        };

        
        $scope.closeProduct = function closeProduct() {

            $scope.panel.open = false;
            $scope.panel.model = {};
            $scope.siteBlackout = false;


            // Remove the HTML content from the panel within 750 milliseconds.
            $timeout(function timeout() {
                $scope.panel.partial = null;
            }, 750);

        }


 }])
