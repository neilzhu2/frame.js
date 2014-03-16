define( [ 'Config', 'WebGLRendererModule' ], function ( config, renderer ) {

	return function () {

		var camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

		var scene = new THREE.Scene();

		var material = new THREE.MeshBasicMaterial( { transparent: true } );

		scene.add( new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), material ) );

		return new FRAME.Module( {

			parameters: {

				url:     new FRAME.ModuleParameter.String( 'URL', '' ),
				opacity: new FRAME.ModuleParameter.Float( 'Opacity', 1, 0, 1 )

			},

			init: function () {

				material.map = THREE.ImageUtils.loadTexture( config.rootPath + this.parameters.url.value );

			},

			update: function () {

				material.opacity = this.parameters.opacity.value;
				renderer.render( scene, camera );

			}

		} );

	};

} );