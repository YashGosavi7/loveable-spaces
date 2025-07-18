import { useState } from "react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ImageUploadPage = () => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleImageUploaded = (url: string) => {
    setUploadedUrls(prev => [...prev, url]);
    console.log('Image uploaded:', url);
  };

  return (
    <motion.div 
      className="min-h-screen pt-24 section-padding"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          
          <h1 className="font-playfair text-4xl mb-4">Upload Project Images</h1>
          <p className="text-lg text-muted-foreground">
            Add new images to your portfolio projects
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Image Upload</CardTitle>
            <CardDescription>
              Upload high-quality images for your projects. Images will be stored securely and optimized for display.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload 
              onImageUploaded={handleImageUploaded}
              maxFiles={20}
            />
          </CardContent>
        </Card>

        {uploadedUrls.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Uploaded Images ({uploadedUrls.length})</CardTitle>
              <CardDescription>
                Your uploaded images are ready to use in projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white text-sm font-medium">
                        Image {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default ImageUploadPage;