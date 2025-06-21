"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useQuoteWizard } from "@/contexts/quote-wizard-context"
import { Camera } from "lucide-react"
import { useState, useRef } from "react"

const PhotosStep: React.FC = () => {
  const { goToNextStep, goToPreviousStep } = useQuoteWizard()

  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddPhotos = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    setUploadedPhotos((prev) => [...prev, ...imageFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    setUploadedPhotos((prev) => [...prev, ...imageFiles])
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">Add Photos (Optional)</h3>
        <p className="text-gray-600">Help your movers prepare better with photos of your space</p>
      </div>

      <div className="text-center space-y-6">
        <p className="text-gray-600">
          Your Helpers can better prepare for your move with a few photos of your space—no packing necessary.
        </p>
        <p className="text-gray-600">You can add photos any time before your move starts.</p>

        <div
          className={`border-2 border-dashed rounded-lg p-8 md:p-12 transition-colors duration-200 ${
            isDragging ? "border-primary-400 bg-primary-50" : "border-gray-300 hover:border-primary-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button onClick={handleAddPhotos} className="flex flex-col items-center justify-center w-full group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-200">
              <Camera className="h-6 w-6 md:h-8 md:w-8 text-primary-600" />
            </div>
            <span className="text-primary-600 font-medium text-base md:text-lg group-hover:text-primary-700 transition-colors duration-200">
              Add Photos
            </span>
            <span className="text-gray-500 text-sm mt-2">Click to upload or drag and drop</span>
          </button>
        </div>

        {uploadedPhotos.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Uploaded Photos ({uploadedPhotos.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(photo) || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 md:h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {(photo.size / 1024 / 1024).toFixed(1)}MB
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500 space-y-2">
          <p>• Take photos of rooms and any special items</p>
          <p>• Show access points like stairs or narrow hallways</p>
          <p>• Include any fragile or valuable items</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          className="flex-1 py-6 text-base border-2 hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={goToNextStep}
          className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {uploadedPhotos.length > 0 ? "Continue" : "Skip & Continue"}
        </Button>
      </div>
    </div>
  )
}

export default PhotosStep
