import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit2, Save, RefreshCw, Copy, ArrowLeft, Eye } from 'lucide-react';

const defaultContent = {
  title: '',
  description: '',
  metaTitle: '',
  metaDescription: ''
};

const SingleProductPreview = ({ 
  product = {
    title: '',
    image: null,
    originalTitle: '',
    originalDescription: ''
  }, 
  generatedContent = defaultContent,
  onApply = () => {},
  onRegenerate = () => {},
  onBack = () => {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(generatedContent || defaultContent);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation */}
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-900">
              {product.title || 'Untitled Product'}
            </h1>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
            <Button 
              variant="outline"
              onClick={onRegenerate}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button onClick={() => onApply(editedContent)}>
              <Save className="h-4 w-4 mr-2" />
              Apply Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Product Image and Original Content */}
          <div className="col-span-4 space-y-6">
            <Card>
              <CardContent className="p-4">
                <img
                  src={product.image?.src || '/api/placeholder/400/400'}
                  alt={product.title || 'Product image'}
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Original Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Product Title</label>
                    <p className="mt-1">{product.originalTitle || 'No original title'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Product Description</label>
                    <p className="mt-1 text-sm whitespace-pre-wrap">
                      {product.originalDescription || 'No original description'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Generated Content Editor */}
          <div className="col-span-8">
            <Card>
              <Tabs defaultValue="content">
                <CardHeader>
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                    <TabsTrigger value="ai-output">AI Analysis</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="p-6">
                  <TabsContent value="content" className="mt-0">
                    <div className="space-y-6">
                      {/* Product Title */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium">Product Title</label>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(editedContent.title)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full p-3 border rounded-md"
                            value={editedContent.title || ''}
                            onChange={(e) => setEditedContent({
                              ...editedContent,
                              title: e.target.value
                            })}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md">
                            {editedContent.title || 'No title generated'}
                          </div>
                        )}
                      </div>

                      {/* Product Description */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium">Product Description</label>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(editedContent.description)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {isEditing ? (
                          <textarea
                            className="w-full min-h-[400px] p-3 border rounded-md"
                            value={editedContent.description || ''}
                            onChange={(e) => setEditedContent({
                              ...editedContent,
                              description: e.target.value
                            })}
                          />
                        ) : (
                          <div 
                            className="min-h-[400px] p-3 bg-gray-50 rounded-md whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ 
                              __html: editedContent.description || 'No description generated'
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="mt-0">
                    <div className="space-y-6">
                      {/* Meta Title */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium">Meta Title</label>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(editedContent.metaTitle)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full p-3 border rounded-md"
                            value={editedContent.metaTitle || ''}
                            onChange={(e) => setEditedContent({
                              ...editedContent,
                              metaTitle: e.target.value
                            })}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md">
                            {editedContent.metaTitle || 'No meta title generated'}
                          </div>
                        )}
                        <div className="mt-1 text-sm text-gray-500 flex justify-between">
                          <span>{(editedContent.metaTitle || '').length}/60 characters</span>
                          {(editedContent.metaTitle || '').length > 60 && (
                            <span className="text-red-500">Title is too long</span>
                          )}
                        </div>
                      </div>

                      {/* Meta Description */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium">Meta Description</label>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(editedContent.metaDescription)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {isEditing ? (
                          <textarea
                            className="w-full h-32 p-3 border rounded-md"
                            value={editedContent.metaDescription || ''}
                            onChange={(e) => setEditedContent({
                              ...editedContent,
                              metaDescription: e.target.value
                            })}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md">
                            {editedContent.metaDescription || 'No meta description generated'}
                          </div>
                        )}
                        <div className="mt-1 text-sm text-gray-500 flex justify-between">
                          <span>{(editedContent.metaDescription || '').length}/155 characters</span>
                          {(editedContent.metaDescription || '').length > 155 && (
                            <span className="text-red-500">Description is too long</span>
                          )}
                        </div>
                      </div>

                      {/* Search Preview */}
                      <div className="mt-6 border-t pt-6">
                        <h3 className="text-sm font-medium mb-3">Google Search Preview</h3>
                        <div className="p-4 bg-white border rounded-lg">
                          <div className="text-blue-600 text-lg mb-1 truncate">
                            {editedContent.metaTitle || product.title || 'Product Title'}
                          </div>
                          <div className="text-green-700 text-sm mb-2">
                            www.yourstore.com/products/{product.handle || 'product-handle'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {editedContent.metaDescription || 'Product meta description will appear here...'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ai-output" className="mt-0">
                    <div className="space-y-6">
                      {/* AI Analysis Results */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Visual Analysis</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <dl className="space-y-4">
                            {Object.entries(generatedContent.analysis || {}).map(([key, value]) => (
                              <div key={key}>
                                <dt className="text-sm font-medium text-gray-500 capitalize">
                                  {key.replace(/_/g, ' ')}
                                </dt>
                                <dd className="mt-1 text-sm">
                                  {Array.isArray(value) ? value.join(', ') : value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>

                      {/* SEO Analysis */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">SEO Analysis</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <dl className="space-y-4">
                            {Object.entries(generatedContent.seoAnalysis || {}).map(([key, value]) => (
                              <div key={key}>
                                <dt className="text-sm font-medium text-gray-500 capitalize">
                                  {key.replace(/_/g, ' ')}
                                </dt>
                                <dd className="mt-1 text-sm">
                                  {typeof value === 'boolean' ? 
                                    (value ? '✓' : '✗') : 
                                    value
                                  }
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPreview;