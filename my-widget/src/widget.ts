import { connectMyWidget } from './connector';
import { createMyWidgetRenderer } from './renderer';
import type {
  MyWidgetWidgetCreator,
  MyWidgetConnectorParams,
  MyWidgetWidgetParams,
} from './types';

/*
 * Widget creator
 * Returns a widget instance
 */
export const myWidget: MyWidgetWidgetCreator = function MyWidget(
  widgetParams
) {
  const rendererWidgetParams: MyWidgetWidgetParams = {
    container: widgetParams.container,
    // TODO: pick the widget-only parameters from the widgetParams
  };

  const { render, dispose } = createMyWidgetRenderer(
    rendererWidgetParams
  );

  const createWidget = connectMyWidget(render, dispose);

  const connectorParams: MyWidgetConnectorParams = {
    // TODO: pick the connector-only parameters from the widgetParams
  };

  return {
    ...createWidget(connectorParams),
    $$widgetType: 'Helsingborg stad.my-widget',
  };
};
