import { act } from 'react-dom/test-utils';

import { screen, userEvent } from './test_utils';

const awaitDeepNestedUpdates = async () => {
  const promise = Promise.resolve();
  await act(async () => {
    await promise;
  });
};

const findFieldAndEnterText = async (label, text) => {
  const field = screen.getByLabelText(label);
  await userEvent.type(field, text);
};

const clickButton = async (label) => {
  const spanElement = screen.getByText(label);
  const buttonElement = spanElement.closest('button');
  expect(buttonElement).toHaveTextContent(label);
  expect(buttonElement.disabled).toBe(false);
  await userEvent.click(buttonElement);
};

export { awaitDeepNestedUpdates, findFieldAndEnterText, clickButton };
