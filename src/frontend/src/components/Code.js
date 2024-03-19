import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark, coldarkCold, coldarkDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Code({content}){
   
      
    
    return(
        <SyntaxHighlighter language='solidity' style={coldarkDark}>
            {content}
        </SyntaxHighlighter>
    )

};
