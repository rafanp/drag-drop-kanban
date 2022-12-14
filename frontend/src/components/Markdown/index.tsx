import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighterComponent = ({ value, language }: any) => {
  return (
    <SyntaxHighlighter language={language ?? null} style={docco}>
      {value ?? ''}
    </SyntaxHighlighter>
  );
};

const Markdown = (props: any) => {
  return (
    <ReactMarkdown
      children={props.text}
      renderers={{
        code: SyntaxHighlighterComponent,
      }}
    />
  );
};

export default Markdown;
