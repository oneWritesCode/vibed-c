import React, { useState, useRef } from 'react';
import { Check, X, QrCode } from 'lucide-react';

function App() {
  const [isEditing, setIsEditing] = useState<'name' | 'title' | 'department' | 'location' | null>(null);
  const [badgeContent, setBadgeContent] = useState({
    name: 'u/RedditUser',
    title: 'Community Moderator',
    department: 'r/technology',
    location: 'Global Community',
    id: 'MOD-2024-001'
  });
  const [tempContent, setTempContent] = useState('');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialRotation, setInitialRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialRotation({ ...rotation });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    // Calculate rotation based on drag distance (more controlled)
    const rotateY = initialRotation.y + (deltaX * 0.5);
    const rotateX = initialRotation.x - (deltaY * 0.5);
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const startEdit = (field: 'name' | 'title' | 'department' | 'location') => {
    setIsEditing(field);
    setTempContent(badgeContent[field as keyof typeof badgeContent]);
  };

  const saveEdit = () => {
    if (isEditing) {
      setBadgeContent(prev => ({ ...prev, [isEditing]: tempContent }));
      setIsEditing(null);
      setTempContent('');
    }
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setTempContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const cardStyle = {
    transform: `
      perspective(1500px) 
      rotateX(${rotation.x}deg) 
      rotateY(${rotation.y}deg)
      translateZ(50px)
    `,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* Real 3D Card Container */}
      <div className="perspective-1500">
        <div
          ref={cardRef}
          className="card-3d-container"
          style={cardStyle}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Back Layer (Z-depth) */}
          <div className="card-back-layer"></div>
          
          {/* Card Middle Layer */}
          <div className="card-middle-layer"></div>
          
          {/* Badge Clip */}
          <div className="card-clip">
            <div className="clip-hole"></div>
          </div>
          
          {/* Main Card Surface */}
          <div className="card-surface">
            {/* Shiny Reflection Overlay */}
            <div className="card-shine-overlay"></div>
            
            {/* Card Content */}
            <div className="relative z-20 p-8 h-full flex flex-col">
              {/* Profile Image */}
              <div className="mb-8 flex justify-center">
                <div className="profile-container-3d">
                  <img
                    src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-3 border-orange-500"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="mb-8 text-center">
                {isEditing === 'name' ? (
                  <div className="flex items-center gap-2 justify-center">
                    <input
                      type="text"
                      value={tempContent}
                      onChange={(e) => setTempContent(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="text-orange-600 text-lg font-bold bg-transparent border-b-2 border-orange-400 text-center focus:outline-none focus:border-orange-600 w-48"
                      autoFocus
                    />
                    <button onClick={saveEdit} className="text-orange-500">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={cancelEdit} className="text-orange-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <h1 
                    className="text-lg font-bold text-orange-600 tracking-wide cursor-pointer hover:text-orange-500 transition-colors"
                    onClick={() => startEdit('name')}
                  >
                    {badgeContent.name}
                  </h1>
                )}
              </div>

              {/* User Details - Reduced gaps */}
              <div className="mb-8 space-y-1 text-sm">
                <div className="detail-row-3d">
                  <span className="detail-label-3d">Role:</span>
                  {isEditing === 'title' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="text-gray-800 text-sm bg-transparent border-b border-orange-300 focus:outline-none focus:border-orange-500 flex-1 w-32"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="text-orange-500">
                        <Check className="w-3 h-3" />
                      </button>
                      <button onClick={cancelEdit} className="text-orange-400">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <span 
                      className="detail-value-3d cursor-pointer hover:text-orange-600 transition-colors"
                      onClick={() => startEdit('title')}
                    >
                      {badgeContent.title}
                    </span>
                  )}
                </div>

                <div className="detail-row-3d">
                  <span className="detail-label-3d">Subreddit:</span>
                  {isEditing === 'department' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="text-gray-800 text-sm bg-transparent border-b border-orange-300 focus:outline-none focus:border-orange-500 flex-1 w-32"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="text-orange-500">
                        <Check className="w-3 h-3" />
                      </button>
                      <button onClick={cancelEdit} className="text-orange-400">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <span 
                      className="detail-value-3d cursor-pointer text-orange-500 hover:text-orange-400 transition-colors"
                      onClick={() => startEdit('department')}
                    >
                      {badgeContent.department}
                    </span>
                  )}
                </div>

                <div className="detail-row-3d">
                  <span className="detail-label-3d">Community:</span>
                  {isEditing === 'location' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="text-gray-800 text-sm bg-transparent border-b border-orange-300 focus:outline-none focus:border-orange-500 flex-1 w-32"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="text-orange-500">
                        <Check className="w-3 h-3" />
                      </button>
                      <button onClick={cancelEdit} className="text-orange-400">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <span 
                      className="detail-value-3d cursor-pointer hover:text-orange-600 transition-colors"
                      onClick={() => startEdit('location')}
                    >
                      {badgeContent.location}
                    </span>
                  )}
                </div>
              </div>

              {/* QR Code Section */}
              <div className="qr-section-3d mt-auto">
                <div className="qr-code-3d">
                  <QrCode className="w-12 h-12 text-orange-500" />
                </div>
                <div className="qr-info-3d">
                  <div className="employee-id-3d">ID: {badgeContent.id}</div>
                  <div className="scan-text-3d">Scan to connect</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;