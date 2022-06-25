// test-utils.js
import { render, queries, RenderOptions, RenderResult } from '@testing-library/react'
import { JSXElementConstructor, ReactElement } from 'react';
import * as customQueries from './custom-queries'
import * as customFunctionalities from './functionalities';

const customRender = (ui: ReactElement<any, string | JSXElementConstructor<any>>, options?: RenderOptions) =>
    render(ui, { queries: { ...queries, ...customQueries, ...customFunctionalities }, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }