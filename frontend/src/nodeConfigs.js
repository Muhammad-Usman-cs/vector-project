import { TextNode }  from './nodes/textNode';
import { ImageNode } from './nodes/imageNode';

export const NODE_CONFIGS = [
  {
    type: 'customInput',
    label: 'Input',
    icon: '→',
    color: '#7c3aed',
    inputs: [],
    outputs: [{ id: 'value', label: 'value' }],
    getDefaults: (nodeId) => ({
      inputName: nodeId.replace('customInput-', 'input_'),
      inputType: 'Text',
    }),
    fields: [
      { key: 'inputName', type: 'text',   label: 'Name' },
      { key: 'inputType', type: 'select', label: 'Type', default: 'Text',
        options: ['Text', 'File'] },
    ],
  },

  {
    type: 'personalInfo',
    label: 'Personal Information',
    icon: '👤',
    color: '#0ea5e9',
    inputs: [],
    outputs: [{ id: 'data', label: 'data' }],
    fields: [
      { key: 'name',   type: 'text',  label: 'Name' },
      { key: 'label',  type: 'text',  label: 'Label' },
      { key: 'gender', type: 'radio', label: 'Gender', options: ['Male', 'Female'] },
    ],
  },
  {
    type: 'customOutput',
    label: 'Output',
    icon: '←',
    color: '#059669',
    inputs: [{ id: 'value', label: 'value' }],
    outputs: [],
    getDefaults: (nodeId) => ({
      outputName: nodeId.replace('customOutput-', 'output_'),
      outputType: 'Text',
    }),
    fields: [
      { key: 'outputName', type: 'text',   label: 'Name' },
      { key: 'outputType', type: 'select', label: 'Type', default: 'Text',
        options: ['Text', 'Image'] },
    ],
  },

  {
    type: 'llm',
    label: 'LLM',
    icon: '✦',
    color: '#d97706',
    inputs: [
      { id: 'system', label: 'system', style: { top: '33%' } },
      { id: 'prompt', label: 'prompt', style: { top: '67%' } },
    ],
    outputs: [{ id: 'response', label: 'response' }],
    fields: [
      { type: 'info', title: 'Language Model',
        description: 'Accepts a system prompt and user prompt, returns a generated response.' },
    ],
  },

  {
    type: 'text',
    label: 'Text',
    icon: 'T',
    color: '#2563eb',
    component: TextNode,
    getDefaults: () => ({ text: '{{input}}' }),
  },

  {
    type: 'image',
    label: 'Image',
    icon: '⬜',
    color: '#ec4899',
    component: ImageNode,
  },

  {
    type: 'filter',
    label: 'Filter',
    icon: '⚡',
    color: '#06b6d4',
    inputs: [{ id: 'data', label: 'data' }],
    outputs: [
      { id: 'pass', label: 'pass', style: { top: '35%' } },
      { id: 'fail', label: 'fail', style: { top: '65%' } },
    ],
    fields: [
      { key: 'field',    type: 'text',   label: 'Field',    placeholder: 'field name' },
      { key: 'operator', type: 'select', label: 'Operator', default: 'equals',
        options: [
          { value: 'equals',       label: 'equals' },
          { value: 'not_equals',   label: 'not equals' },
          { value: 'contains',     label: 'contains' },
          { value: 'greater_than', label: 'greater than' },
          { value: 'less_than',    label: 'less than' },
        ],
      },
      { key: 'value', type: 'text', label: 'Value', placeholder: 'compare value' },
    ],
  },

  {
    type: 'api',
    label: 'API Call',
    icon: '⇄',
    color: '#f59e0b',
    inputs: [{ id: 'body', label: 'body' }],
    outputs: [
      { id: 'response', label: 'response', style: { top: '35%' } },
      { id: 'error',    label: 'error',    style: { top: '65%' } },
    ],
    fields: [
      { key: 'method', type: 'select', label: 'Method', default: 'GET',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
      { key: 'url',  type: 'text',   label: 'URL',  placeholder: 'https://api.example.com/...' },
      { key: 'auth', type: 'select', label: 'Auth', default: 'None',
        options: [
          { value: 'None',   label: 'None' },
          { value: 'Bearer', label: 'Bearer Token' },
          { value: 'ApiKey', label: 'API Key' },
          { value: 'Basic',  label: 'Basic Auth' },
        ],
      },
    ],
  },

  {
    type: 'merge',
    label: 'Merge',
    icon: '⊕',
    color: '#8b5cf6',
    inputs: [
      { id: 'a', label: 'input A', style: { top: '35%' } },
      { id: 'b', label: 'input B', style: { top: '65%' } },
    ],
    outputs: [{ id: 'merged', label: 'merged' }],
    fields: [
      { type: 'info', title: 'Merge Inputs',
        description: 'Combines two inputs into a single output.' },
      { key: 'separator', type: 'select', label: 'Separator', default: '\\n',
        options: [
          { value: '\\n', label: 'Newline' },
          { value: ' ',   label: 'Space' },
          { value: ', ',  label: 'Comma' },
          { value: '',    label: 'None' },
        ],
      },
    ],
  },

  {
    type: 'conditional',
    label: 'Conditional',
    icon: '?',
    color: '#ef4444',
    inputs: [{ id: 'input', label: 'input' }],
    outputs: [
      { id: 'true',  label: 'true',  style: { top: '35%' } },
      { id: 'false', label: 'false', style: { top: '65%' } },
    ],
    fields: [
      { key: 'condition', type: 'text', label: 'Condition', placeholder: 'e.g. value > 10' },
      {
        type: 'info',
        render: () => (
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Routes to <strong className="text-slate-400">true</strong> or{' '}
            <strong className="text-slate-400">false</strong> based on the condition.
          </p>
        ),
      },
    ],
  },
];
