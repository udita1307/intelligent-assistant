
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderLine = (line: string, index: number) => {
    let processedLine = line;

    // Bold text: **text**
    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-cyan-300">$1</strong>');
    
    // Italic text: *text*
    processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return (
        <li key={index} dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} className="ml-5"/>
      );
    }
    
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-cyan-400" dangerouslySetInnerHTML={{ __html: processedLine.substring(4) }} />;
    }
    
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 border-b border-gray-600 pb-2" dangerouslySetInnerHTML={{ __html: processedLine.substring(3) }} />;
    }
    
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-3xl font-extrabold mt-8 mb-4" dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />;
    }
    
    return <p key={index} dangerouslySetInnerHTML={{ __html: processedLine }} className="my-2" />;
  };

  const blocks = content.split('\n\n');

  return (
    <div className="prose prose-invert max-w-none">
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n');
        const isList = lines.some(line => line.startsWith('* ') || line.startsWith('- '));
        
        if (isList) {
          return <ul key={blockIndex} className="list-disc space-y-1 my-3">{lines.map(renderLine)}</ul>;
        }
        
        return <div key={blockIndex}>{lines.map((line, lineIndex) => renderLine(line, lineIndex))}</div>;
      })}
    </div>
  );
};
