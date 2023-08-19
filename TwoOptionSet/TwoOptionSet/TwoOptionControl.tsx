import * as React from 'react';
import {Toggle, Stack, Icon, Label} from "@fluentui/react";
import { IInputs } from './generated/ManifestTypes';

export interface IToggleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  pcfContext: ComponentFramework.Context<IInputs>;
  setValue: (value: boolean | undefined) => void;
  onChange: (ev: React.MouseEvent<HTMLElement>, checked: boolean | undefined) => void;
}

export class ToggleControl extends React.Component<IToggleProps> {

  public render(): React.ReactNode{
    return (
      this.props.pcfContext.parameters.booleanProperty.raw != undefined ?
          (
            this.props.pcfContext.mode.isControlDisabled ?    
              (<Stack>  
              <Toggle disabled = {true} onText={this.props.pcfContext.parameters.booleanProperty.attributes?.Options[1].Label} offText={this.props.pcfContext.parameters.booleanProperty.attributes?.Options[0].Label} checked={this.props.pcfContext.parameters.booleanProperty.raw} />
              </Stack>)
              :(<Stack> 
              <Toggle onText={this.props.pcfContext.parameters.booleanProperty.attributes?.Options[1].Label} offText={this.props.pcfContext.parameters.booleanProperty.attributes?.Options[0].Label} checked={this.props.pcfContext.parameters.booleanProperty.raw} onChange={this.props.onChange} />
              <Icon iconName={"Refresh"} onClick = {this.initialiseValue}  />
              </Stack>)
          ):
          (<Stack><Label onClick={this.initialiseDefaultValue}> ---</Label></Stack>)
          
      );
  }

  public initialiseValue = ():void =>{
    this.props.setValue(undefined);
  }
  public initialiseDefaultValue = ():void =>{
    if(this.props.pcfContext.parameters.booleanProperty.attributes?.DefaultValue != undefined)
      this.props.setValue(this.props.pcfContext.parameters.booleanProperty.attributes?.DefaultValue);

    else
      this.props.setValue(false);
  }
}
