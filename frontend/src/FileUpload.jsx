import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Alert,
  Paper,
  IconButton,
  Fade,
  Grow
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const FileUpload = ({ 
  onFileSelect, 
  onFileRemove, 
  acceptedTypes = '.txt,.pdf,.doc,.docx',
  maxSize = 10 * 1024 * 1024, // 10MB
  disabled = false 
}) => {
  const theme = useTheme();
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    // Check file size
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
    }

    // Check file type
    const allowedTypes = acceptedTypes.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.some(type => fileExtension === type)) {
      return `Please upload files with these extensions: ${allowedTypes.join(', ')}`;
    }

    return null;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelection = useCallback((file) => {
    setError('');
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    
    // Simulate upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          onFileSelect(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  }, [onFileSelect, maxSize, acceptedTypes]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [handleFileSelection, disabled]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setError('');
    onFileRemove?.();
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const iconColor = theme.palette.primary.main;
    
    switch (extension) {
      case 'pdf':
        return <DescriptionIcon sx={{ fontSize: 48, color: '#e53e3e' }} />;
      case 'doc':
      case 'docx':
        return <DescriptionIcon sx={{ fontSize: 48, color: '#3182ce' }} />;
      case 'txt':
        return <DescriptionIcon sx={{ fontSize: 48, color: iconColor }} />;
      default:
        return <DescriptionIcon sx={{ fontSize: 48, color: iconColor }} />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!selectedFile ? (
        <Paper
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            border: dragOver 
              ? `3px dashed ${theme.palette.primary.main}` 
              : disabled 
                ? `2px dashed ${theme.palette.grey[300]}` 
                : `2px dashed ${theme.palette.grey[400]}`,
            borderRadius: 3,
            p: 6,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: dragOver 
              ? `${theme.palette.primary.main}08` 
              : disabled 
                ? theme.palette.grey[50] 
                : theme.palette.background.paper,
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': disabled ? {} : {
              borderColor: theme.palette.primary.main,
              backgroundColor: `${theme.palette.primary.main}04`,
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <Fade in={true}>
            <Box>
              <CloudUploadIcon 
                sx={{ 
                  fontSize: 64, 
                  color: dragOver 
                    ? theme.palette.primary.main 
                    : disabled 
                      ? theme.palette.grey[400] 
                      : theme.palette.grey[500],
                  mb: 2,
                  transition: 'color 0.3s ease'
                }} 
              />
              <Typography 
                variant="h6" 
                fontWeight={600} 
                gutterBottom
                sx={{ 
                  color: disabled ? theme.palette.grey[500] : theme.palette.text.primary 
                }}
              >
                {dragOver ? 'Drop your file here' : 'Upload Legal Document'}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}
              >
                Drag and drop your document here, or click to browse files
              </Typography>
              <Button
                variant="contained"
                component="label"
                disabled={disabled}
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 4
                }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  accept={acceptedTypes}
                  onChange={handleFileInputChange}
                />
              </Button>
              <Typography variant="caption" display="block" color="text.secondary">
                Supported formats: PDF, DOC, DOCX, TXT (Max {Math.round(maxSize / (1024 * 1024))}MB)
              </Typography>
            </Box>
          </Fade>
        </Paper>
      ) : (
        <Grow in={true}>
          <Paper sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getFileIcon(selectedFile.name)}
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="h6" fontWeight={600} noWrap>
                  {selectedFile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatFileSize(selectedFile.size)}
                </Typography>
              </Box>
              <IconButton 
                onClick={handleRemoveFile}
                color="error"
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            
            {uploadProgress < 100 ? (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    Uploading...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {uploadProgress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={uploadProgress}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[200]
                  }}
                />
              </Box>
            ) : (
              <Chip
                icon={<CheckCircleIcon />}
                label="Upload Complete"
                color="success"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            )}
          </Paper>
        </Grow>
      )}
      
      {error && (
        <Fade in={true}>
          <Alert 
            severity="error" 
            icon={<ErrorIcon />}
            sx={{ mt: 2, borderRadius: 2 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        </Fade>
      )}
    </Box>
  );
};

export default FileUpload;