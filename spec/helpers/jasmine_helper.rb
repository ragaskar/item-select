class JasmineHelper
  def self.files
    #return a list of files you want to load before your spec defintions load
    ['/lib/jquery.js', '/lib/selectable.js']
  end

  def self.stylesheets
    #return a list of stylesheets you want to load in the runner    
    []
  end

end
