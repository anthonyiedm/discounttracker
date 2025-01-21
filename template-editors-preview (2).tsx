import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, ArrowLeft, ArrowRight, Type, Copy, Info 
} from 'lucide-react';

const TemplateEditorsPreview = () => {
  const [templates, setTemplates] = useState({
    title: '{{title}} - {{primary_feature}} | {{brand_name}}',
    description: '<p>{{product_intro}}</p>\n\n<h2>Key Features:</h2>\n<ul>{{features_list}}</ul>',
    metaTitle: '{{title}} - {{primary_keyword}} | {{brand_name}}',
    metaDescription: '{{short_description}} Features: {{key_features}}. {{cta}}'
  });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Template Editors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Title Template */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-sm font-medium">Product Title Template</label>
              <p className="text-xs text-gray-500 mt-1">
                Define how your product titles will be structured
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <textarea
            className="w-full p-3 border rounded-md h-20"
            value={templates.title}
            placeholder="Enter product title template..."
          />
        </div>

        {/* Description Template with Rich Text Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-sm font-medium">Product Description Template</label>
              <p className="text-xs text-gray-500 mt-1">
                Format your description template with rich text options
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="border rounded-md">
            {/* Rich Text Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-white border-b">
              <div className="flex items-center gap-1 border-r pr-2">
                <Button variant="ghost" size="sm" title="Undo">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Redo">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1 border-r pr-2">
                <Button variant="ghost" size="sm" title="Bold">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Italic">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Underline">
                  <Underline className="h-4 w-4" />
                </Button>
              </div>

              <Select defaultValue="Arial">
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
              </Select>

              <Select defaultValue="14">
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
              </Select>

              <div className="w-8 h-8 border rounded cursor-pointer bg-black" title="Text Color" />

              <div className="flex items-center gap-1 border-l pl-2">
                <Button variant="ghost" size="sm" title="Align Left">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Align Center">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Align Right">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1 border-l pl-2">
                <Button variant="ghost" size="sm" title="Bullet List">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Numbered List">
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Description Editor Area */}
            <div 
              className="min-h-[300px] p-4 bg-white"
              contentEditable
              dangerouslySetInnerHTML={{ __html: templates.description }}
            />
          </div>
        </div>

        {/* Meta Title Template */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-sm font-medium">Meta Title Template</label>
              <p className="text-xs text-gray-500 mt-1">
                Limited to 60 characters for SEO optimization
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <textarea
            className="w-full p-3 border rounded-md h-20"
            value={templates.metaTitle}
            placeholder="Enter meta title template..."
            maxLength={60}
          />
          <div className="mt-1 text-sm text-gray-500 text-right">
            {templates.metaTitle.length}/60 characters
          </div>
        </div>

        {/* Meta Description Template */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-sm font-medium">Meta Description Template</label>
              <p className="text-xs text-gray-500 mt-1">
                Limited to 155 characters for SEO optimization
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <textarea
            className="w-full p-3 border rounded-md h-32"
            value={templates.metaDescription}
            placeholder="Enter meta description template..."
            maxLength={155}
          />
          <div className="mt-1 text-sm text-gray-500 text-right">
            {templates.metaDescription.length}/155 characters
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateEditorsPreview;