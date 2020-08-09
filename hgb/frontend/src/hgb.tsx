import React, { ReactNode } from "react"
import {
  withStreamlitConnection,
  StreamlitComponentBase,
  Streamlit,
} from "./streamlit"
//import { OpenSeadragonViewer } from "openseadragon-react-viewer"
import OpenSeadragon from "openseadragon"

interface State {
  numClicks: number
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class HGB extends StreamlitComponentBase<State> {
  public state = { numClicks: 0 }

  public componentDidMount = () => {
    const host = this.props.args["host"]
    const port = this.props.args["port"]

    const prefixUrl = `http://${host}:${port}/images/`;
    const url = `http://${host}:${port}/genome.dzi`;

    OpenSeadragon.DEFAULT_SETTINGS.timeout = 120000; 
    var viewer = OpenSeadragon({
        id:            "openseadragon1",
        panVertical:    true,
        prefixUrl:     prefixUrl,
        navigatorSizeRatio: 0.25,
        wrapHorizontal:     false,
        debugMode:  false,
        showNavigator:  true,
        navigatorHeight:   "10px",
        navigatorWidth:    "845px",
        defaultZoomLevel:   36,
        minZoomLevel:     18,
        visibilityRatio:    0.25,
        tileSources:   url,
    });
    Streamlit.setFrameHeight();
  }
  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const host = this.props.args["host"]
    const port = this.props.args["port"]
    const url = `http://${host}:${port}/genome.dzi`;

    const options = {
        showDropdown: true,
        showThumbnails: true,
        showToolbar: true,
        deepLinking: true,
        height: 300,
    };

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <div>
       {/*url*/}
       <div id="openseadragon1" style={{width: "95%", height: "720px"}}></div>
       {/*<OpenSeadragonViewer manifestUrl={url} options={options} />*/}
      </div>
    )
  }

  /** Click handler for our "Click Me!" button. */
  private onClicked = (): void => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ numClicks: prevState.numClicks + 1 }),
      () => Streamlit.setComponentValue(this.state.numClicks)
    )
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(HGB)
