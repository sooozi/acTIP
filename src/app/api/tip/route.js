import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  const result = {
    items: [],
  };

  for (let i = 1; i < 21; i++) {
    result.items.push({
      id: `a${i}`,
      tipName: `청바지세탁 ${i}`,
    });
  }

  for (let i = 1; i < 21; i++) {
    result.items.push({
      id: `b${i}`,
      tipName: `슬랙스세탁 ${i}`,
    });
  }

  for (let i = 1; i < 21; i++) {
    result.items.push({
      id: `c${i}`,
      tipName: `음식 ${i}`,
    });
  }

  for (let i = 1; i < 21; i++) {
    result.items.push({
      id: `d${i}`,
      tipName: `운동 ${i}`,
    });
  }

  if (keyword) {
    result.items = result.items.filter((item) => {
      return item.tipName.includes(keyword);
    });
  }

  return NextResponse.json(result);
}

export async function POST() {
  const result = {};
  return NextResponse.json(result);
}

export async function PUT() {
  const result = {};
  return NextResponse.json(result);
}

export async function DELETE() {
  const result = {};
  return NextResponse.json(result);
}
