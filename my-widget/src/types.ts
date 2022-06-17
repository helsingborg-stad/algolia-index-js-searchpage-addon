import type {
  Renderer,
  Connector,
  WidgetFactory,
} from 'instantsearch.js/es';

/*
 * Parameters send only to the widget creator function
 * These parameters will be used by the widget creator to create the widget renderer and factory
 */
export type MyWidgetWidgetParams = {
  container: Element | string;
  // TODO: add the widget params
};

/*
 * Parameters send to the widget creator function
 * These parameters will be used by the widget creator to manage the widget logic
 */
export type MyWidgetConnectorParams = {
  // TODO: add the widget params
};

export type MyWidgetRenderState = {
  // TODO: add the render state params
};

type MyWidgetWidgetDescription = {
  $$type: 'Helsingborg stad.my-widget';
  renderState: MyWidgetRenderState;
  indexRenderState: {
    myWidget: {
      // TODO: add the return type of getRenderState
    };
  };
  indexUiState: {
    myWidget: {
      // TODO: add the return type of getWidgetUiState
    }
  };
};

/*
 * Connector type, constructed from the Renderer and Connector parameters
 */
export type MyWidgetConnector = Connector<
  MyWidgetWidgetDescription,
  MyWidgetConnectorParams
>;

/*
 * Renderer type, constructed from the Renderer and Connector parameters
 */
export type MyWidgetRendererCreator = (
  widgetParams: MyWidgetWidgetParams
) => {
  render: Renderer<
    MyWidgetWidgetDescription['renderState'],
    MyWidgetConnectorParams
  >;
  dispose: () => void;
};

/*
 * Widget type, constructed from the Renderer, Connector and Widget parameters
 */
export type MyWidgetWidgetCreator = WidgetFactory<
  MyWidgetWidgetDescription & {
    $$widgetType: 'Helsingborg stad.my-widget';
  },
  MyWidgetConnectorParams,
  MyWidgetWidgetParams
>;
