var Properties = function ( editor ) {

	var container = new UI.Panel();

	// signals

	var signals = editor.signals;

	editor.signals.elementSelected.add( function ( element ) {

		console.log( element );

		container.clear();

		var parameters = element.module.parameters.input;

		for ( var key in parameters ) {

			var parameter = parameters[ key ];

			var parameterRow = new UI.Panel();
			parameterRow.add( new UI.Text( key ).setWidth( '90px' ) );

			( function ( key ) {

				if ( parameter instanceof FRAME.ModuleParameter.Integer ) {

					var parameterValue = new UI.Integer()
						.setValue( element.parameters[ key ] )
						.setWidth( '150px' )
						.onChange( function () {

							element.parameters[ key ] = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

				} else if ( parameter instanceof FRAME.ModuleParameter.Float ) {

					var parameterValue = new UI.Number()
						.setValue( element.parameters[ key ] )
						.setWidth( '150px' )
						.onChange( function () {

							element.parameters[ key ] = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

				} else if ( parameter instanceof FRAME.ModuleParameter.String ) {

					var parameterValue = new UI.Input()
						.setValue( element.parameters[ key ] )
						.setWidth( '150px' )
						.onKeyUp( function () {

							element.parameters[ key ] = this.getValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

				} else if ( parameter instanceof FRAME.ModuleParameter.Color ) {

					var parameterValue = new UI.Color()
						.setHexValue( element.parameters[ key ] )
						.setWidth( '150px' )
						.onChange( function () {

							element.parameters[ key ] = this.getHexValue();
							signals.timelineElementChanged.dispatch( element );

						} );

					parameterRow.add( parameterValue );

				}

			} )( key );

			container.add( parameterRow );

		};

	} );

	return container;

}