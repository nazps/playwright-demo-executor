import { mergeTests } from '@playwright/test';
import { test as pageTests } from './page-fixtures';
import { test as apiTests } from './api-fixtures'

export const test = mergeTests(pageTests, apiTests);