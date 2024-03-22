<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Movie;


class MovieController extends Controller
{

  public function store(Request $request)
  {
    $Movie = new Movie([
      'imdbID' => $request->get('imdbID'),
      
    ]);
    $Movie->save();
    return response()->json('Successfully added');
  }

  public function getAll()
  {
    $data = Movie::get();
    return response()->json($data, 200);
  }
  public function get($id)
  {
    $data = Movie::find($id);
    return response()->json($data, 200);
  }
 
  public function update(Request $request, $id)
  {
  
    $post = Movie::find($id);
    $post->update($request->all());
    return response()->json($post, 200);

  }

  public function destroy($id)
  {
    $post = Movie::find($id);
    $post->delete();
    return response()->json($post, 200);
  }
}
