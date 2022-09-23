import { render } from '@testing-library/react';

import Root from './root.component';

describe('Root component', () => {
  it('should be in the document', () => {
    const { queryByText } = render(<Root />);
    expect(queryByText(/Sign in/i)).toBeNull();
  });
});
