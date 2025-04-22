import { NextResponse } from 'next/server';
import { callGraph } from '@/lib/graphClient';

export async function GET() {
  try {
    // Test different Graph API endpoints
    const results = {
      // Get current user info
      me: await callGraph('/me'),
      
      // Get root files from OneDrive
      files: await callGraph('/me/drive/root/children'),
      
      // Get SharePoint sites
      sites: await callGraph('/sites?$select=id,displayName,webUrl'),
    };

    console.log('Graph API Test Results:', JSON.stringify(results, null, 2));

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Graph API Test Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 