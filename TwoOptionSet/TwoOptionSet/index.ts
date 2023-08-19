import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import {IToggleProps, ToggleControl} from "./TwoOptionControl";
import ReactDOM = require("react-dom");

export class TwoOptionSet implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container : HTMLDivElement;
    private _value : boolean | undefined;
    private _context : ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        // Add control initialization code
        this._context=context;
        this._container = container;
        this._value = context.parameters.booleanProperty.raw;
        this._notifyOutputChanged = notifyOutputChanged;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        const toggleProps: IToggleProps = {
            pcfContext: context,
            setValue: this._setValue,
            onChange: this._toggleChanged
        };

        ReactDOM.render( React.createElement(ToggleControl, toggleProps), this._container);  
    }

    private _toggleChanged = (ev:unknown , newValue?: boolean | undefined): void => {
        // Handle toggle change event
        this._value = newValue;
        this._notifyOutputChanged();
        this._context.factory.requestRender();
    }

    private _setValue = (newValue: boolean | undefined): void => {
        // Handle toggle change event
        this._value = newValue;
        this._notifyOutputChanged();
        this._context.factory.requestRender();
    }
    
    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {booleanProperty: this._value};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
