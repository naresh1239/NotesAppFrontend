import React from 'react'
import ReactQuill, { Quill } from 'react-quill';
const Editor = ({value,setValue }) => {

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'blockquote', 'code-block',
        'link', 'image',
        'color', 'background',
        'align',
    ];

  return (
               <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    className="editor"
                
                    placeholder="Start writing your content here..."
                />
  )
}

export default Editor